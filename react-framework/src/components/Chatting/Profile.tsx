interface ProfileProps {
    profile: string
    className: string
}

export function Profile({ profile, className }: ProfileProps) {
    return (
        <img
            src={profile}
            className={"w-40 h-40 rounded-20 " + className}
        />
    )
}