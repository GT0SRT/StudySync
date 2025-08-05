import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../Components/firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";

const signInwithGoogle = () => {
    function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      const user = result.user;
      if (result.user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: "",
        });
        toast.success("User logged in Successfully", {
          position: "top-center",
        });
        window.location.href = "/";
      }
    });
  }

  return (
    <div>
    <div>
        <button onClick={googleLogin} className="border-2 text-md mt-1 pl-5 pr-5 pt-1 pb-1 border-[#061F2B] rounded-xl
        text-white hover:text-[#061F2B] bg-[#061F2B] hover:bg-transparent">signup with <FcGoogle size={20} className='inline pb-1'/></button>
    </div>
    </div>
  )
}

export default signInwithGoogle