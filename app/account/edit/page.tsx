import EditForm from './EditForm'

export default function EditAccountPage() {
    return (
        <div className = "flex flex-col items-center gap-6">

            {/* Header */}
            <div className = "w-full max-w-md flex justify-center items-center gap-3">
                <h1 className  = "text-xl font-semibold text-white-800 text-center">Edit Profile</h1>
            </div>

            <hr className = "w-full max-w-md border-gray-200" />

            <EditForm />
        </div>
    )
}