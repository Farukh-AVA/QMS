import React, {useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import {useNavigate} from "react-router-dom";
import LoaderButton from "../../components/LoaderButton";
import { API } from "aws-amplify";
import { MemberType } from "../../types/member";
import { onError } from "../../lib/errorLib";
import 'react-phone-number-input/style.css';
import "./NewMember.css";

export default function NewMember() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return name.length > 0 && phoneNumber.length == 12;
  }

  const handlePhoneNumberChange = (e) => {
    let input = e.target.value;
    
    // Remove all non-digit characters from the input
    input = input.replace(/\D/g, '');
  
    // Format the input value
    const formattedNumber = formatPhoneNumber(input);
  
    // Update state with the formatted number
    setPhoneNumber(formattedNumber);
  };
  
  const formatPhoneNumber = (phoneNumber) => {
    // Apply custom formatting logic to the phone number
    // For example, you can format it as 'XXX-XXX-XXXX'
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  };

  function createMember(member: MemberType) {
    return API.post("admin", "/queue", {
      body: member,
    });
  }
  

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    setIsLoading(true);
  
    try {
      await createMember({ name, phoneNumber });
      nav("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="NewMember">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
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
        
        <LoaderButton
          size="lg"
          type="submit"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Register
        </LoaderButton>
      </Form>
    </div>
  );
}
