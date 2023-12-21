import { getServerSession as defaultGetServerSession } from "next-auth";
import authOptions from "./authOptions";

const getServerSession = () => defaultGetServerSession(authOptions);

export default getServerSession;
