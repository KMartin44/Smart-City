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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->enum("category", ["kultura", "kozossegi", "oktatas", "sport", "csaladi", "kreativ", "vallasi", "onkormanyzati", "egyeb"]);
            /* Kulturális események, Közösségi és civil események, Oktatás és ismeretterjesztés, Sport és szabadidő, Gyermek- és családi programok, Kreatív és kézműves, Vallási események, Önkormányzati és hivatalos események, Egyéb */
            $table->string("title");
            $table->decimal("latitude", 11, 8);
            $table->decimal("longitude", 11, 8);
            $table->text("description");
            $table->dateTime("start_time");
            $table->dateTime("end_time");
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
        Schema::dropIfExists('events');
    }
};
