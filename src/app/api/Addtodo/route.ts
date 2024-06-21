import connectDB from "@/libs/DBconnection";
import Todo from "@/model/todo.modle";

import { NextRequest, NextResponse } from "next/server";
import { todo } from "node:test";

// Connect to the database
connectDB();

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const data = await req.json();

    // Create a new Todo instance and save it to the database
    const newTodo = new Todo(data);
    await newTodo.save();

    // Return a success response
    return NextResponse.json({ success: true, data: newTodo });
  } catch (error: any) {
    // Return an error response
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function GET(req: NextRequest) {
  try {
    // Parse the request body
    console.log("Ok");
    const Alltodo = await Todo.find();
    console.log(Alltodo, "All");
    // Return a success response
    return NextResponse.json(Alltodo);
  } catch (error: any) {
    // Return an error response
    return NextResponse.json({ success: false, error: error.message });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    // Parse the request body
    const id = req.nextUrl.searchParams.get("ID");
    await Todo.findByIdAndDelete(id);

    // Return a success response
    return NextResponse.json({ success: true });
  } catch (error: any) {
    // Return an error response
    return NextResponse.json({ success: false, error: error.message });
  }
}
export async function PUT(req: NextRequest) {
  console.log("Hi, I am put");
  try {
    // Get the ID from query parameters
    const id = req.nextUrl.searchParams.get("ID");
    if (!id) throw new Error("ID parameter is required");

    // Find the Todo item by ID
    const todo = await Todo.findById(id);
    if (!todo) throw new Error("Todo not found");

    // Toggle the completed status
    todo.completed = !todo.completed;
    todo.createdAt = new Date();
    await todo.save();

    console.log(todo, "After change");

    // Return a success response
    return NextResponse.json({ success: true, data: todo });
  } catch (error: any) {
    // Return an error response
    return NextResponse.json({ success: false, error: error.message });
  }
}
