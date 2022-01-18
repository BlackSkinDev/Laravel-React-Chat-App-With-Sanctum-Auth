<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Events\NewMessage;
use Illuminate\Http\Request;
use App\Http\Resources\MessageResource;

class ChatController extends Controller
{
    public function message(Request $request){

         $message =Message::create([
            'username' => $request->username,
            'message' => $request->message
        ]);

        event(new NewMessage($message));

        return response()->json(['success' => true,'data' => new MessageResource($message)],201);


    }

    public function messages(){
        $messages = Message::all();
        return response()->json(['success' => true,'data'=>MessageResource::collection($messages)],200);

    }



}
