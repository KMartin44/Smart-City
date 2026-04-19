<?php

namespace App\Policies;

use App\Models\Statement;
use App\Models\User;

class StatementPolicy
{
    public function viewAny(?User $user): bool
    {
        return true;
    }

    public function view(?User $user, Statement $statement): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return in_array($user->type, ['admin', 'onkormanyzati']);
    }

    public function update(User $user, Statement $statement): bool
    {
        return in_array($user->type, ['admin', 'onkormanyzati']);
    }

    public function delete(User $user, Statement $statement): bool
    {
        return in_array($user->type, ['admin', 'onkormanyzati']);
    }

    public function restore(User $user, Statement $statement): bool
    {
        return $user->type === 'admin';
    }

    public function forceDelete(User $user, Statement $statement): bool
    {
        return $user->type === 'admin';
    }
}

