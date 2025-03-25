"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ApiDocs() {
  const [activeTab, setActiveTab] = useState("auth")

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">API Documentation</h1>

      <Tabs defaultValue="auth" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
        </TabsList>

        <TabsContent value="auth" className="space-y-4 mt-6">
          <h2 className="text-2xl font-semibold">Authentication Endpoints</h2>

          <EndpointCard
            method="POST"
            endpoint="/api/auth/register"
            description="Register a new user"
            requestBody={{
              username: "johndoe",
              email: "john@example.com",
              password: "password123",
              firstName: "John",
              lastName: "Doe",
              bio: "Software developer",
            }}
            response={{
              id: 1,
              username: "johndoe",
              email: "john@example.com",
              profile: {
                id: 1,
                firstName: "John",
                lastName: "Doe",
                bio: "Software developer",
              },
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            }}
          />

          <EndpointCard
            method="POST"
            endpoint="/api/auth/login"
            description="Login with existing credentials"
            requestBody={{
              email: "john@example.com",
              password: "password123",
            }}
            response={{
              id: 1,
              username: "johndoe",
              email: "john@example.com",
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            }}
          />
        </TabsContent>

        <TabsContent value="users" className="space-y-4 mt-6">
          <h2 className="text-2xl font-semibold">User Endpoints</h2>

          <EndpointCard
            method="GET"
            endpoint="/api/users/me"
            description="Get current user profile"
            auth={true}
            response={{
              id: 1,
              username: "johndoe",
              email: "john@example.com",
              profile: {
                id: 1,
                firstName: "John",
                lastName: "Doe",
                bio: "Software developer",
              },
            }}
          />
        </TabsContent>

        <TabsContent value="projects" className="space-y-4 mt-6">
          <h2 className="text-2xl font-semibold">Project Endpoints</h2>

          <EndpointCard
            method="POST"
            endpoint="/api/projects"
            description="Create a new project"
            auth={true}
            requestBody={{
              name: "Website Redesign",
              description: "Redesign company website with new branding",
            }}
            response={{
              id: 1,
              name: "Website Redesign",
              description: "Redesign company website with new branding",
              createdAt: "2023-05-15T10:30:00Z",
              updatedAt: "2023-05-15T10:30:00Z",
            }}
          />

          <EndpointCard
            method="GET"
            endpoint="/api/projects"
            description="Get all projects"
            auth={true}
            response={[
              {
                id: 1,
                name: "Website Redesign",
                description: "Redesign company website with new branding",
                createdAt: "2023-05-15T10:30:00Z",
                updatedAt: "2023-05-15T10:30:00Z",
              },
              {
                id: 2,
                name: "Mobile App Development",
                description: "Create a new mobile app for customers",
                createdAt: "2023-05-16T14:20:00Z",
                updatedAt: "2023-05-16T14:20:00Z",
              },
            ]}
          />

          <EndpointCard
            method="GET"
            endpoint="/api/projects/:projectId/tasks"
            description="Get all tasks for a specific project"
            auth={true}
            response={[
              {
                id: 1,
                title: "Design homepage mockup",
                description: "Create mockup for the new homepage design",
                status: "in-progress",
                createdAt: "2023-05-15T11:30:00Z",
                updatedAt: "2023-05-15T11:30:00Z",
                tags: [
                  { id: 1, name: "design" },
                  { id: 2, name: "frontend" },
                ],
              },
              {
                id: 2,
                title: "Implement navigation",
                description: "Create responsive navigation menu",
                status: "todo",
                createdAt: "2023-05-15T12:30:00Z",
                updatedAt: "2023-05-15T12:30:00Z",
                tags: [{ id: 2, name: "frontend" }],
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4 mt-6">
          <h2 className="text-2xl font-semibold">Task Endpoints</h2>

          <EndpointCard
            method="POST"
            endpoint="/api/tasks"
            description="Create a new task"
            auth={true}
            requestBody={{
              title: "Design homepage mockup",
              description: "Create mockup for the new homepage design",
              status: "todo",
              projectId: 1,
              tagIds: [1, 2],
            }}
            response={{
              id: 1,
              title: "Design homepage mockup",
              description: "Create mockup for the new homepage design",
              status: "todo",
              createdAt: "2023-05-15T11:30:00Z",
              updatedAt: "2023-05-15T11:30:00Z",
              project: {
                id: 1,
                name: "Website Redesign",
              },
              tags: [
                { id: 1, name: "design" },
                { id: 2, name: "frontend" },
              ],
            }}
          />

          <EndpointCard
            method="PUT"
            endpoint="/api/tasks/:id"
            description="Update an existing task"
            auth={true}
            requestBody={{
              title: "Design homepage mockup",
              description: "Create mockup for the new homepage design",
              status: "in-progress",
            }}
            response={{
              id: 1,
              title: "Design homepage mockup",
              description: "Create mockup for the new homepage design",
              status: "in-progress",
              createdAt: "2023-05-15T11:30:00Z",
              updatedAt: "2023-05-15T13:45:00Z",
              project: {
                id: 1,
                name: "Website Redesign",
              },
              tags: [
                { id: 1, name: "design" },
                { id: 2, name: "frontend" },
              ],
            }}
          />

          <EndpointCard
            method="DELETE"
            endpoint="/api/tasks/:id"
            description="Delete a task"
            auth={true}
            response={{
              message: "Task deleted successfully",
            }}
          />
        </TabsContent>

        <TabsContent value="tags" className="space-y-4 mt-6">
          <h2 className="text-2xl font-semibold">Tag Endpoints</h2>

          <EndpointCard
            method="POST"
            endpoint="/api/tags"
            description="Create a new tag"
            auth={true}
            requestBody={{
              name: "design",
            }}
            response={{
              id: 1,
              name: "design",
              createdAt: "2023-05-15T10:00:00Z",
              updatedAt: "2023-05-15T10:00:00Z",
            }}
          />

          <EndpointCard
            method="POST"
            endpoint="/api/tasks/:id/tags"
            description="Assign tags to a task"
            auth={true}
            requestBody={{
              tagIds: [1, 2, 3],
            }}
            response={{
              id: 1,
              title: "Design homepage mockup",
              tags: [
                { id: 1, name: "design" },
                { id: 2, name: "frontend" },
                { id: 3, name: "priority" },
              ],
            }}
          />

          <EndpointCard
            method="GET"
            endpoint="/api/tags/:id/tasks"
            description="Get all tasks with a specific tag"
            auth={true}
            response={[
              {
                id: 1,
                title: "Design homepage mockup",
                description: "Create mockup for the new homepage design",
                status: "in-progress",
                createdAt: "2023-05-15T11:30:00Z",
                updatedAt: "2023-05-15T11:30:00Z",
                project: {
                  id: 1,
                  name: "Website Redesign",
                },
              },
              {
                id: 3,
                title: "Design logo",
                description: "Create new company logo",
                status: "todo",
                createdAt: "2023-05-16T09:30:00Z",
                updatedAt: "2023-05-16T09:30:00Z",
                project: {
                  id: 1,
                  name: "Website Redesign",
                },
              },
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function EndpointCard({ method, endpoint, description, auth = false, requestBody = null, response = null }) {
  const [showRequest, setShowRequest] = useState(true)
  const [showResponse, setShowResponse] = useState(true)

  const methodColors = {
    GET: "bg-blue-100 text-blue-800",
    POST: "bg-green-100 text-green-800",
    PUT: "bg-yellow-100 text-yellow-800",
    DELETE: "bg-red-100 text-red-800",
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge className={methodColors[method]}>{method}</Badge>
            <CardTitle className="text-lg font-mono">{endpoint}</CardTitle>
          </div>
          {auth && (
            <Badge variant="outline" className="border-amber-500 text-amber-500">
              Requires Authentication
            </Badge>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {requestBody && (
          <div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowRequest(!showRequest)}
            >
              <h3 className="font-medium">Request Body</h3>
              <span>{showRequest ? "−" : "+"}</span>
            </div>
            {showRequest && (
              <pre className="mt-2 p-4 bg-gray-100 rounded-md overflow-auto text-sm">
                {JSON.stringify(requestBody, null, 2)}
              </pre>
            )}
          </div>
        )}

        {response && (
          <div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowResponse(!showResponse)}
            >
              <h3 className="font-medium">Response</h3>
              <span>{showResponse ? "−" : "+"}</span>
            </div>
            {showResponse && (
              <pre className="mt-2 p-4 bg-gray-100 rounded-md overflow-auto text-sm">
                {JSON.stringify(response, null, 2)}
              </pre>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

