import { MdEdit } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { GoPencil } from "react-icons/go";

export const Todo=({list,task,error,handleChange,handleSubmit,handleClear,handleDelete,handle,handleEdit,handletick})=>{
    return(
        <div className="main text-center">
            <h3 className="text-5xl pt-[80px] ">My Tasks</h3>
            <div className="todoapp">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Add your task here" required 
                    className="w-[40%] h-[40px] m-[10px]" 
                    value={task} onChange={(e) => handleChange(e, error)} />
                    <button type="button" className="bg-black text-white text-xl p-[5px] m-2" onClick={handleSubmit}>Add Task</button>
                    <button type="button" className='bg-black text-white text-xl p-[5px] clear-btn' onClick={handleClear}>clear</button>
                    {error && <span>{error}</span>}
                </form>
                <ul className="w-[50%] mx-auto ">
                    {list.map((item) =>
                         <li key={item.id} id={item.id} className="text-xl"
                            style={{ textDecoration : item.completed ? "line-through":"none"}}>{item.title} 
                         <span className='reacticons'>
                            <GoPencil onClick={()=>handleEdit(item)}/>
                            <TiTick className="tick" onClick={() => handletick(item.id)} />
                            <RxCross2 onClick={() => handleDelete(item.id)} className="rx" />
                        </span>
                        </li>)}
                </ul>
            </div>
        </div>
    )
}