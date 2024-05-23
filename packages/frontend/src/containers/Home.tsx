import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../lib/contextLib";
import { API } from "aws-amplify";
import { MemberType } from "../types/member";
import { onError } from "../lib/errorLib";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

export default function Home() {

  const [members, setMembers] = useState<Array<MemberType>>([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [ws, setWs] = useState<WebSocket>();
  const userType = sessionStorage.getItem('userType') || "";
 

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
  
      try {
        const notes = await loadMembers();
        setMembers(notes);
        // Create a WebSocket connection
        const socket = new WebSocket('wss://4wf02dowz9.execute-api.us-east-1.amazonaws.com/dev');
        setWs(socket);
        // Handle incoming messages
        socket.onmessage = (event) => {
          const message = event.data;
          // Update state based on the message
          if (message === 'ADMIN' || message === 'CUSTOMER') {
            // Trigger a reload of customer data
            reloadCustomerData();
          }  
        };

        // Handle WebSocket connection close
        socket.onclose = () => {
          console.log('WebSocket connection closed');
        };


      } catch (e) {
        onError(e);
      }
  
      setIsLoading(false);
    }

  
    onLoad();
  }, [isAuthenticated]);

  // Function to reload customer data from the server
  async function reloadCustomerData() {
    try {
      const customerData = await loadMembers();
      setMembers(customerData);
    } catch (error) {
      onError(error);
    }
  }
  
  function loadMembers() {

      return API.get(userType, "/queue", {});
    
  }

  function formatDate(str: undefined | string) {
    return !str ? "" : new Date(str).toLocaleString();
  }

  function renderAdminMembersList(members: MemberType[]) {
    return (
      <>
        <LinkContainer to="/member/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ms-2 fw-bold">Register</span>
          </ListGroup.Item>
        </LinkContainer>
        {members.map(({ queueMemberId, fullName, createdAt }) => (
          <LinkContainer key={queueMemberId} to={`/member/${queueMemberId}`}>
            <ListGroup.Item action className="text-nowrap text-truncate">
              <span className="fw-bold">{fullName.trim().split("\n")[0]}</span>
              <br />
              <span className="text-muted">
                Registered: {formatDate(createdAt)}
              </span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  }

  function renderCustomerMembersList(members: MemberType[]) {
    return (
      <>
        <LinkContainer to="/member/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ms-2 fw-bold">Register</span>
          </ListGroup.Item>
        </LinkContainer>
        {members.map(({queueMemberId, fullName, createdAt }) => (
            <ListGroup.Item key={queueMemberId} action className="text-nowrap text-truncate">
              <span className="fw-bold">{fullName.trim().split("\n")[0]}</span>
              <br />
              <span className="text-muted">
                Registered: {formatDate(createdAt)}
              </span>
            </ListGroup.Item>
        ))}
      </>
    );
  }
  
  function renderLander() {
    return (
    <div className="lander">
      <h1>QMS</h1>
      <p className="text-muted">Queue Managment System</p>
    </div>

    )
  }

  function renderMembers() {
    return (
      <div className="members">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Queue Members</h2>
        <ListGroup>
          {
            userType === "admin" ?
            !isLoading && renderAdminMembersList(members) :
            !isLoading && renderCustomerMembersList(members)
          }
        
        </ListGroup>
      </div>
    );
  }
  
  return (
    <div className="Home">
      {isAuthenticated ? renderMembers() : renderLander()}  
    </div>
  );
}