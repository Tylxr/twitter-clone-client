import LoginForm from "../components/login/LoginForm";

export default function Page() {
    return (
        <div className="w-screen h-screen">
            <div className="bg-black-gradient sm:bg-red-500 h-full w-full text-white flex flex-row justify-between items-center">
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center cursor-default hover:text-gray-200">
                        <h1 className="text-[70px] m-0" style={{ fontFamily: "Roboto-700" }}>
                            Twitter
                        </h1>
                        <p className="text-lg m-0 italic" style={{ fontFamily: "Roboto-300" }}>
                            Join the conversation.
                        </p>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
