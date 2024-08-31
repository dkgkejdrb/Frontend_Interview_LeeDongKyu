import { Link } from 'react-router-dom';
import { Button } from 'antd';

const Home = () => {
    return (
        <main style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <>
                <h1>WELCOME!</h1>
                <p>
                    Check out my latest projects In CREVERSE:
                </p>
                <p>
                    👇👇Click Here!👇👇
                </p>
                <Link to="/clovastudio" style={{ marginTop: 40, width: 450 }}>
                    <Button style={{ width: "100%" }}>
                        Prompt Engineering GUI Tool for Primary and Secondary Students
                    </Button>
                </Link>
                <Link to="/landingpagesettings" style={{ width: 450 }}>
                    <Button style={{ marginTop: 20, width: "100%" }}>
                        Configure Personal Chatbot Landing Page</Button>
                </Link>
            </>
        </main>
    );
}

export default Home;