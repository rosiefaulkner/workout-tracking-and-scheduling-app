import React, { useState } from "react";
import PageLayout from "./layout/PageLayout";
import { Card, Button, Table, Tooltip } from "@nextui-org/react";

const Home = () => {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Chris Lee", email: "chris@example.com", role: "Editor" },
  ];
  return (
    <PageLayout>
      <div className="flex h-screen flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-64 bg-gray-800 text-white p-6 flex flex-col">
          <h2 className="text-2xl font-semibold mb-8">Admin Dashboard</h2>
          <ul className="space-y-4">
            <li>
              <Button flat color="primary" className="w-full">
                Overview
              </Button>
            </li>
            <li>
              <Button flat color="primary" className="w-full">
                Users
              </Button>
            </li>
            <li>
              <Button flat color="primary" className="w-full">
                Analytics
              </Button>
            </li>
            <li>
              <Button flat color="primary" className="w-full">
                Settings
              </Button>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-gray-100 p-8 overflow-y-auto">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            <Button flat color="secondary">
              Logout
            </Button>
          </header>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 shadow-lg">
              <h3 className="text-xl font-semibold">Total Users</h3>
              <p className="text-4xl font-semibold">1,245</p>
              <Button flat color="success" className="mt-4">
                View Details
              </Button>
            </Card>
            <Card className="p-6 shadow-lg">
              <h3 className="text-xl font-semibold">Total Revenue</h3>
              <p className="text-4xl font-semibold">$12,450</p>
              <Button flat color="success" className="mt-4">
                View Details
              </Button>
            </Card>
            <Card className="p-6 shadow-lg">
              <h3 className="text-xl font-semibold">Active Sessions</h3>
              <p className="text-4xl font-semibold">328</p>
              <Button flat color="success" className="mt-4">
                View Details
              </Button>
            </Card>
          </div>

          {/* User Table */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">User List</h3>
            <Table aria-label="User table">
              <Table.Header>
                <Table.Column>ID</Table.Column>
                <Table.Column>Name</Table.Column>
                <Table.Column>Email</Table.Column>
                <Table.Column>Role</Table.Column>
              </Table.Header>
              <Table.Body>
                {users.map((user) => (
                  <Table.Row key={user.id}>
                    <Table.Cell>{user.id}</Table.Cell>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.role}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Notifications</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <div className="text-sm">New user registration: John Doe</div>
                <Tooltip content="Dismiss">
                  <Button auto flat color="error" size="xs">
                    X
                  </Button>
                </Tooltip>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <div className="text-sm">Revenue goal reached: $12,450</div>
                <Tooltip content="Dismiss">
                  <Button auto flat color="error" size="xs">
                    X
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;

export function TableCompo() {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Chris Lee", email: "chris@example.com", role: "Editor" },
  ];
  return (
    <div className="flex h-screen flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-gray-800 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-semibold mb-8">Admin Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <Button flat color="primary" className="w-full">
              Overview
            </Button>
          </li>
          <li>
            <Button flat color="primary" className="w-full">
              Users
            </Button>
          </li>
          <li>
            <Button flat color="primary" className="w-full">
              Analytics
            </Button>
          </li>
          <li>
            <Button flat color="primary" className="w-full">
              Settings
            </Button>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <Button flat color="secondary">
            Logout
          </Button>
        </header>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 shadow-lg">
            <h3 className="text-xl font-semibold">Total Users</h3>
            <p className="text-4xl font-semibold">1,245</p>
            <Button flat color="success" className="mt-4">
              View Details
            </Button>
          </Card>
          <Card className="p-6 shadow-lg">
            <h3 className="text-xl font-semibold">Total Revenue</h3>
            <p className="text-4xl font-semibold">$12,450</p>
            <Button flat color="success" className="mt-4">
              View Details
            </Button>
          </Card>
          <Card className="p-6 shadow-lg">
            <h3 className="text-xl font-semibold">Active Sessions</h3>
            <p className="text-4xl font-semibold">328</p>
            <Button flat color="success" className="mt-4">
              View Details
            </Button>
          </Card>
        </div>

        {/* User Table */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">User List</h3>
          <Table aria-label="User table">
            <Table.Header>
              <Table.Column>ID</Table.Column>
              <Table.Column>Name</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column>Role</Table.Column>
            </Table.Header>
            <Table.Body>
              {users.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.id}</Table.Cell>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.role}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        {/* Notifications */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div className="text-sm">New user registration: John Doe</div>
              <Tooltip content="Dismiss">
                <Button auto flat color="error" size="xs">
                  X
                </Button>
              </Tooltip>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div className="text-sm">Revenue goal reached: $12,450</div>
              <Tooltip content="Dismiss">
                <Button auto flat color="error" size="xs">
                  X
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
