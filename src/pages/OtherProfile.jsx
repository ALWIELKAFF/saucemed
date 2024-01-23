import { Navigate, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../utils/config";
import { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";

const OtherProfile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.id);
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await axios.get(baseUrl + `/users/${params.id}`);
      setUser(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (params.id == userId) {
      // navigate("/profile");
      navigate("/profile", { replace: true });
    }
  }, [navigate, params.id, userId]);
  return <Layout>Other profile </Layout>;
};

export default OtherProfile;
