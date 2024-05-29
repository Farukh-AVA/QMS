import { useState, useEffect, useRef } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../lib/contextLib";
import { API } from "aws-amplify";
import { MemberType } from "../types/member";
import { onError } from "../lib/errorLib";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";
import adminConfig from "../AdminConfig";
import "./Home.css";

export default function Home() {

  const [members, setMembers] = useState<Array<MemberType>>([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const userType = sessionStorage.getItem('userType') || "";
  const socketRef = useRef<WebSocket | null>(null);
  const websocketEndPoint = adminConfig.API.endpoints[1].endpoint;
   
 

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
  
      try {
        const getMembers = await loadMembers();
        setMembers(getMembers);

        if(!socketRef.current){
          const socket = new WebSocket(websocketEndPoint);
          socketRef.current = socket;

          socket.onopen = () => {
            console.log('WebSocket connection opened');
            setInterval(sendHeartbeat, 30000);
          }

          socket.onmessage = (event) => {
            const message = event.data;
            if (message === 'ADMIN' || message === 'CUSTOMER') {
              reloadMembers();
            }
          };

          socket.onclose = () => {
            console.log('WebSocket connection closed');
            socketRef.current = null; 
          }    
        }
      } catch (e) {
        onError(e);
      } finally {
        setIsLoading(false);
      }
    }

    onLoad();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    } 

  }, [isAuthenticated]);

  // Function to reload customer data from the server
  async function reloadMembers() {
    try {
      const reloadMembersData = await loadMembers();
      setMembers(reloadMembersData);
    } catch (error) {
      onError(error);
    }
  }

  function sendHeartbeat() {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.log('Sending heartbeat');
      socketRef.current.send('HEARTBEAT');
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