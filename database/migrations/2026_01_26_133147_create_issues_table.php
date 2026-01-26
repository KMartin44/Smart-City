<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('issues', function (Blueprint $table) {
            $table->id();
            $table->enum("category", ["kozterulet", "kornyezet", "koztisztasag", "kozlekedes", "zaj", "kozmuvek", "allat", "intezmenyek", "digitalis", "egyeb"]);
            /* Közterület és infrastruktúra, Zöldterület és környezetvédelem, Köztisztaság, Közlekedés és forgalom, Zaj rend és együttélés, Közművek, Állatokkal kapcsolatos ügyek, Intézmények és szolgáltatások, Digitális / ügyintézési problémák, Egyéb */
            $table->string("title");
            $table->decimal("latitude", 11, 8);
            $table->decimal("longitude", 11, 8);
            $table->text("description");
            $table->unsignedBigInteger("user_id");
            $table->timestamps();
            $table->softDeletes();
            $table->foreign("user_id")->references("id")->on("users");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('issues');
    }
};
