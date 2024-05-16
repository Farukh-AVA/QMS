import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home.tsx";
import NotFound from "./containers/NotFound.tsx";
import Login from "./containers/Login.tsx";
import NewMember from "./containers/Admin/NewMember.tsx";
import Member from "./containers/Admin/Member.tsx";

export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/member/new" element={<NewMember />} />
      <Route path="/member/:id" element={<Member />} />
      <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}