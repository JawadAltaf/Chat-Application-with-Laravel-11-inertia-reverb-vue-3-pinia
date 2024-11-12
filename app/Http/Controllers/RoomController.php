<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoomResource;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function show(Room $room){
        return Inertia::render('Room/Show',[
            'room' => RoomResource::make($room)
        ]);
    }
}