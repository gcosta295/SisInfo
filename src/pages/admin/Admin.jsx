import "./Admin";
import { useNavigate } from "react-router";
import { db } from "../../firebase/firebase"; 
import { collection, query, where, getDocs } from "firebase/firestore"; 
import { useState, useEffect} from "react";

export default function Home() {

return(
    <h1>admin</h1>
)

}