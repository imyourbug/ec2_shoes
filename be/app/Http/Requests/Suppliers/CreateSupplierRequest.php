<?php

declare(strict_types=1);

namespace App\Http\Requests\Suppliers;

use App\Http\Requests\BaseRequest;

class CreateSupplierRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'email' => 'required|email:dns,rfc',
            'address' => 'required|string',
            'phone' => 'nullable|string|max:10'
        ];
    }
}
