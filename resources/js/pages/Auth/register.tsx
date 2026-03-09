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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select"

export default function Register() {

  const { data, setData, post, processing, errors } = useForm({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone_number: "",
    dob: "",
    address: "",
    type: "lakos"
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    post("/register")
  }

  return (
    <div className="flex items-center justify-center min-h-screen">

      <Card className="w-[450px]">

        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>

        <CardContent>

          <form onSubmit={submit} className="space-y-4">

            <div>
              <Label>First name</Label>
              <Input
                value={data.first_name}
                onChange={(e)=>
                  setData("first_name", e.target.value)
                }
              />
            </div>

            <div>
              <Label>Last name</Label>
              <Input
                value={data.last_name}
                onChange={(e)=>
                  setData("last_name", e.target.value)
                }
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={data.email}
                onChange={(e)=>
                  setData("email", e.target.value)
                }
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={data.password}
                onChange={(e)=>
                  setData("password", e.target.value)
                }
              />
            </div>

            <div>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                value={data.password_confirmation}
                onChange={(e)=>
                  setData("password_confirmation", e.target.value)
                }
              />
            </div>

            <div>
              <Label>Phone</Label>
              <Input
                value={data.phone_number}
                onChange={(e)=>
                  setData("phone_number", e.target.value)
                }
              />
            </div>

            <div>
              <Label>Date of birth</Label>
              <Input
                type="date"
                value={data.dob}
                onChange={(e)=>
                  setData("dob", e.target.value)
                }
              />
            </div>

            <div>
              <Label>Address</Label>
              <Input
                value={data.address}
                onChange={(e)=>
                  setData("address", e.target.value)
                }
              />
            </div>

            <div>
              <Label>User type</Label>

              <Select
                defaultValue="lakos"
                onValueChange={(value)=>
                  setData("type", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="lakos">
                    Lakos
                  </SelectItem>

                  <SelectItem value="onkormanyzat">
                    Önkormányzat
                  </SelectItem>

                  <SelectItem value="admin">
                    Admin
                  </SelectItem>

                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full"
              disabled={processing}
            >
              Register
            </Button>

          </form>

        </CardContent>
      </Card>

    </div>
  )
}