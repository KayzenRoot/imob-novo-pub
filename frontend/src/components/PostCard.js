import { Link } from "react-router-dom";

export default function PostCard({ post }) {
	return (
		<div className='border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-150'>
			<Link to={`/blog/${post.id}`} className='block overflow-hidden'>
				<img
					src={post.data.postImage}
					alt={post.data.title}
					className='object-cover w-full h-40'
				/>
				<div className='p-4'>
					<h3 className='text-lg font-semibold'>{post.data.title}</h3>
				</div>
			</Link>
		</div>
	);
}
