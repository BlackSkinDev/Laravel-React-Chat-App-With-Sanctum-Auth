<?php

namespace App\Http\Controllers;

use App\Events\NewMessage;
use App\Models\Message;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function message(Request $request){

         $message =Message::create([
            'username' => $request->username,
            'message' => $request->content
        ]);

        event( new NewMessage($message));

        return response()->json(['success' => true]);


    }



}
