import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import '../App.css';
export const TodoItem = ({ todos, markCompeleted, handleDelete, handleEdit }) => {

    return (
        <div className='box--todo'>
            <ul className='list--todo'>
                {
                    todos.map((todo, index) => {
                        return <li key={index} className='todo-item'>
                            <div className='content'>
                                <input type='checkbox' checked={todo.completed}
                                    onChange={() => markCompeleted(todo.id)} />
                                <span className={todo.completed ? 'underline--text' : ''}>{todo.title}</span>
                            </div>
                            <button className='btn-edit' onClick={() => handleEdit(todo.id)}>
                                <FontAwesomeIcon icon={faEdit} style={{ fontSize: '1.8rem', cursor: 'pointer' }} />
                            </button>
                            <button className='btn-delete' onClick={() => handleDelete(todo.id)}>
                                <FontAwesomeIcon icon={faTrashAlt} style={{ fontSize: '1.8rem', cursor: 'pointer' }} />
                            </button>
                        </li>;
                    })
                }
            </ul>
            <div className='todo-description'>
                <p>{`You have total ${todos.length} task todo`}</p>
            </div>
        </div>
    );
};
