import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Task Management API</h1>
          <p className="mt-4 text-xl text-gray-600">A RESTful API for managing users, tasks, projects, and tags</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">API Documentation</h2>
          <p className="mb-4">
            This API provides endpoints for user authentication, project management, task tracking, and tag
            organization.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded p-4">
              <h3 className="font-medium text-lg">Authentication</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>POST /api/auth/register</li>
                <li>POST /api/auth/login</li>
              </ul>
            </div>
            <div className="border rounded p-4">
              <h3 className="font-medium text-lg">Users</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>GET /api/users/me</li>
              </ul>
            </div>
            <div className="border rounded p-4">
              <h3 className="font-medium text-lg">Projects</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>POST /api/projects</li>
                <li>GET /api/projects</li>
                <li>GET /api/projects/:projectId/tasks</li>
              </ul>
            </div>
            <div className="border rounded p-4">
              <h3 className="font-medium text-lg">Tasks</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>POST /api/tasks</li>
                <li>PUT /api/tasks/:id</li>
                <li>DELETE /api/tasks/:id</li>
              </ul>
            </div>
            <div className="border rounded p-4">
              <h3 className="font-medium text-lg">Tags</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>POST /api/tags</li>
                <li>POST /api/tasks/:id/tags</li>
                <li>GET /api/tags/:id/tasks</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <p>To get started with the API, clone the repository and follow the setup instructions in the README.</p>
          <div className="mt-4">
            <Link
              href="/api-docs"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View API Documentation
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

