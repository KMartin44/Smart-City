<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'category',
        'title',
        'latitude',
        'longitude',
        'description',
        'start_time',
        'end_time',
        'user_id',
    ];
}
