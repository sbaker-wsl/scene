import ProfileForm from './ProfileForm'

export default function  AccountPage() {
	return (
		<div className = "flex flex-col items-center gap-6">
			
			{/* Header */}
			<div className = "flex items-center gap-4">
				<div className = "w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
					<span className = "text-2xl text-gray-400">?</span>
				</div>
				<div>
					<h1 className = "text-xl font-semibold text-white-800"> Your Profile </h1>
					<p className = "text-sm text-gray-400">Manage your account details </p>
				</div>
			</div>

			<hr className = "border-white-200" />

			<ProfileForm />
		</div>
	);
}
