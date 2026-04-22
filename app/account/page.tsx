import ProfileForm from './ProfileForm'

export default function  AccountPage() {
	return (
		<div className = "flex flex-col items-center gap-6 bg-black min-h-screen">
			
			{/* Header */}
            <div className = "w-full max-w-md flex justify-center items-center gap-3">
                <h1 className  = "text-xl font-semibold text-white text-center pt-6">Create Your Account</h1>
            </div>

            <hr className = "w-full max-w-md border-gray-200" />

			<ProfileForm />
		</div>
	);
}
