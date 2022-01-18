<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterFormRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {

        return [
            'first_name'=>['required','string', 'max:255','regex:/^[a-zA-ZÑñ\s]+$/','different:last_name'],
            'last_name'=>['required','string', 'max:255','regex:/^[a-zA-ZÑñ\s]+$/'],
            'email'=>['required', 'string', 'email', 'max:255', Rule::unique(User::class)],
            'password'=>'required|min:6|max:16|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/',
            'username'=>['required','string', 'max:12','regex:/^[A-Za-z0-9 ]+$/'],

        ];
    }

    public function messages(){
        return [
            'password.regex'=>'Password must contain an uppercase,lowercase,number and a special character',
            'username.regex'=>'Username may not contain any special character',
            'first_name.regex'=>'First name can only contain letters and space',
            'last_name.regex'=>'First name can only contain letters and space',
            'first_name.different'=>'Oops! Seems your first and last names are the same'
        ];
    }


    public function failedValidation(Validator $validator) {

        throw new HttpResponseException(response()->json([
            'status' => 'error',
            'message' =>null,
            'data'=>$validator->errors()->all()],Response::HTTP_BAD_REQUEST
        ));
    }


}
