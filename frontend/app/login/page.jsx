'use client';
import React from 'react';

import { z } from 'zod';

const formSchema = z.object({
	username: z.string().min(2).max(50),
});

const LoginComponent = () => {
	return <div>LoginComponeent</div>;
};

export default LoginComponent;
