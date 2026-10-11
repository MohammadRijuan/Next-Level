import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const LoginForm = () => {
  return (
    <form action="" >
        <Card className="p-5">
            <label>Email</label>
            <input name="email" type="email" />
            <label>password</label>
            <input name="password" type="password" />
            <Button type="submit">Login</Button>
        </Card>
    </form>
  );
};

export default LoginForm;