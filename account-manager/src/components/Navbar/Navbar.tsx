//import { AiOutlineUser } from 'react-icons/ai'; // Import an account-related icon

const Navbar = () => {
	return (
		<div className='bg-slate-900 text-white'>
			<div className='container mx-auto px-4'>
				<div className='py-4'>
					<nav className='flex items-center justify-center'>
						{/* Center Section */}
						<div className='flex justify-between items-center pr-8'>
							<h1 className='text-xl font-bold'>
								Account Management Application
							</h1>
						</div>
					</nav>
				</div>
			</div>
		</div>
	);
};

{
	/* <span className='text-2xl pl-10 border-l-2 border-white'>
	<AiOutlineUser /> 
</span>; */
}
export default Navbar;
