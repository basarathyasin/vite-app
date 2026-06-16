import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route =createRootRoute({
  component: () => (
    <>
    <div className='flex gap-2 p-2'>
      <Link to="/" className="[&.active]:font-bold">
      Home
      </Link>
      <Link to="/about" className='[&.active]:font-bold'>
      About
      </Link>
        <Link to="/contact" className='[&.active]:font-bold'>
      Contact
      </Link>
        <Link to="/users" className='[&.active]:font-bold'>
      Users
      </Link>
  
    </div>
    <hr />
    <Outlet />
    <TanStackRouterDevtools />
    </>
  )
})