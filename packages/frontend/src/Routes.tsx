import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home.tsx";
import NotFound from "./containers/NotFound.tsx";
import Login from "./containers/Login.tsx";
import NewMember from "./containers/Admin/NewMember.tsx";
import Member from "./containers/Admin/Member.tsx";
import AuthenticatedRoute from "./components/AuthenticatedRoute.tsx";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute.tsx";

export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
        path="/login" 
        element={
          <UnauthenticatedRoute>
            <Login />
          </UnauthenticatedRoute>  
        } 
      />
      <Route 
        path="/member/new" 
        element={
          <AuthenticatedRoute>
            <NewMember />
          </AuthenticatedRoute>  
        } 
      />
      <Route 
        path="/member/:id" 
        element={
          <AuthenticatedRoute>
            <Member />
          </AuthenticatedRoute>  
        } 
      />
      <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}