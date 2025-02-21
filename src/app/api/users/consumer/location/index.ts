/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { Consumer } from "@/models";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = getDataFromToken(request);
        const reqBody = await request.json();
        const { location } = reqBody;

        // Update user with new location
        const user = await Consumer.findByIdAndUpdate(
            userId,
            { location: location },
            { new: true }
        );

        return NextResponse.json({
            message: "Location updated successfully",
            success: true,
            data: user
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}