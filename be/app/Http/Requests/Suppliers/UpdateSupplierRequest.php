<?php

declare(strict_types=1);

namespace App\Http\Requests\Suppliers;

use App\Http\Requests\BaseRequest;

class UpdateSupplierRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'id' => 'required|integer',
            'name' => 'required|string',
            'email' => 'required|email:dns,rfc',
            'address' => 'nullable|string',
            'phone' => 'nullable|string|max:10'
        ];
    }
}
