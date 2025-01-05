<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ThreadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $method = $this->method();

        if ($method === 'POST') {
            $validated = [
                'title' => 'required|max:100|unique:threads',
                'description' => 'required',
                'tags' => 'required|array|min:1|max:3',
                'content' => 'required',
            ];
        } elseif ($method === 'PUT') {
            $validated = [
                'title' => 'required|max:100|unique:threads,title,' . $this->thread->id,
                'description' => 'required',
                'tags' => 'required|array|min:1|max:3',
                'content' => 'required',
            ];
        }

        return $validated;
    }
}
