<?php

namespace App\Http\Controllers;

use App\Models\CurrencyConversion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CurrencyController extends Controller
{
    public function convertCurrency(Request $request)
    {
        $currency = $request->currency;

        $response = Http::get('https://open.er-api.com/v6/latest/USD');

        if ($response->successful()) {
            // Get the response body as JSON (decoded into a PHP array/object)
            $data = $response->json();

            $rate = $data['rates'][$currency];

            $target = $rate * $request->usd_value;

            CurrencyConversion::insert([
                'usd_value' => $request->usd_value,
                'target_value' => $target,
                'target_currency' => $currency
            ]);
        }

        return response()->json([
            'message' => 'success',
            'data' => CurrencyConversion::all()
        ]);

    }

    public function getConversions(Request $request)
    {
        $data = CurrencyConversion::all();

        return response()->json([
            'message' => 'success',
            'data' => $data
        ]);
    }
}
