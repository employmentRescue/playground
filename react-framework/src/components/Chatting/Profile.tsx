interface ProfileProps {
    profile: string
}

export function Profile({ profile }: ProfileProps) {
    return (
        <img
            src={profile}
            className="mt-5 ml-10 w-40 h-40 rounded-20"
        />
    )
}