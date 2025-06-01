// app/about/page.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <Separator className="mb-6" />

      <Card>
        <CardContent className="p-6 space-y-4">
          <p className="text-lg">
            Welcome to our platform! We are a team of passionate developers committed to building elegant and efficient digital solutions.
          </p>
          <p>
            Our goal is to deliver exceptional user experiences through thoughtful design, modern technologies, and scalable systems.
          </p>
          <p>
            From startups to enterprises, we work on a wide range of projects — from websites and mobile apps to IoT and machine learning.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
