<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Issue extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'category',
        'title',
        'latitude',
        'longitude',
        'description',
        'is_done',
        'user_id',
    ];
}
