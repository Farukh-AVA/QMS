import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../../lib/errorLib";
import config from "../../config";
import Form from "react-bootstrap/Form";
import { MemberType } from "../../types/member";
import Stack from "react-bootstrap/Stack";
import LoaderButton from "../../components/LoaderButton";
import "./Member.css";


export default function Notes() {
  const { id } = useParams();
  const nav = useNavigate();
  const [member, setMember] = useState<null | MemberType>(null);
  const [fullName, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadMember() {
      return API.get("admin", `/queue/${id}`, {});
    }

    async function onLoad() {
      try {
        const member = await loadMember();
        const { fullName, phoneNumber  } = member;


        setName(fullName);
        setPhoneNumber(phoneNumber);
        setMember(member);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  function validateForm() {
    return fullName.length > 0 && phoneNumber.length == 12;
  }

  const handlePhoneNumberChange = (e) => {
    let input = e.target.value;
    
    input = input.replace(/\D/g, '');
  
    const formattedNumber = formatPhoneNumber(input);
  
    setPhoneNumber(formattedNumber);
  };
  
  const formatPhoneNumber = (phoneNumber) => {
    
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  };

  function saveNote(member: MemberType) {
    return API.put("admin", `/queue/${id}`, {
      body: member,
    });
  }

  function deleteNote() {
    return API.del("admin", `/queue/${id}`, {});
  }
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  
    event.preventDefault();

    setIsLoading(true);

    try {
        await saveNote({
          fullName: fullName,
          phoneNumber: phoneNumber,
        });
        nav("/");
      } catch (e) {
        onError(e);
        setIsLoading(false);
      }
  }
  
  async function handleDelete(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
  
    if (!confirmed) {
      return;
    }
  
    setIsDeleting(true);
    
    try {
      await deleteNote();
      nav("/");
    } catch (e) {
      onError(e);
      setIsDeleting(false);
    }
  }
  
  return (
    <div className="Members">
      {member && (
        <Form onSubmit={handleSubmit}>
          <Stack gap={3}>
          <Form.Group controlId="name">
            <Form.Control
                type="text"
                placeholder="Name"
                value={fullName}
                as="textarea"
                onChange={(e) => setName(e.target.value)}
            />
           </Form.Group>
           <Form.Group controlId="phone">
            <Form.Control
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              as="textarea"
              onChange={handlePhoneNumberChange}
            />
        </Form.Group>

            <Stack gap={1}>
              <LoaderButton
                size="lg"
                type="submit"
                isLoading={isLoading}
                disabled={!validateForm()}
              >
                Save
              </LoaderButton>
              <LoaderButton
                size="lg"
                variant="danger"
                onClick={handleDelete}
                isLoading={isDeleting}
              >
                Delete
              </LoaderButton>
            </Stack>
          </Stack>
        </Form>
      )}
    </div>
  );
}