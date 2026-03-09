import { useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Login() {

  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    remember: false
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    post("/login")
  }

  return (
    <div className="flex items-center justify-center min-h-screen">

      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>

        <CardContent>

          <form onSubmit={submit} className="space-y-4">

            <div className="space-y-2">
              <Label>Email</Label>

              <Input
                type="email"
                value={data.email}
                onChange={(e) =>
                  setData("email", e.target.value)
                }
              />

              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Password</Label>

              <Input
                type="password"
                value={data.password}
                onChange={(e) =>
                  setData("password", e.target.value)
                }
              />

              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              className="w-full"
              disabled={processing}
            >
              Login
            </Button>

          </form>

        </CardContent>
      </Card>

    </div>
  )
}