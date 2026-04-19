<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class ReverseGeocodingService
{
    public function resolve(?float $latitude, ?float $longitude): ?string
    {
        if ($latitude === null || $longitude === null) {
            return null;
        }

        $lat = round($latitude, 6);
        $lng = round($longitude, 6);
        $cacheKey = "reverse_geocode:{$lat}:{$lng}";

        return Cache::remember($cacheKey, now()->addDays(30), function () use ($lat, $lng) {
            $response = Http::timeout(5)
                ->acceptJson()
                ->withHeaders([
                    'User-Agent' => 'SmartCity',
                ])
                ->get('https://nominatim.openstreetmap.org/reverse', [
                    'format' => 'jsonv2',
                    'lat' => $lat,
                    'lon' => $lng,
                    'accept-language' => 'hu',
                    'zoom' => 18,
                    'addressdetails' => 1,
                ]);

            if (!$response->successful()) {
                return null;
            }

            return $response->json('display_name');
        });
    }
}
