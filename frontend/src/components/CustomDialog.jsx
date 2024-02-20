export default function CustomDialog({message}){
    return(
        <div className="absolute z-50 top-5 w-full">
            <h1 className="bg-teal-500 w-fit m-auto p-4 rounded-lg text-lg text-white max-sm:text-sm">{message}</h1>
        </div>
    )
}