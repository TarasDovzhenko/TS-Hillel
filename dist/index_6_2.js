"use strict";
function handleAction(action) {
    switch (action.type) {
        case 'CREATE_USER': {
            const { name, age } = action.payload;
            console.log(`'CREATE_USER ${name}, AGE-${age}`);
            break;
        }
        case 'DELETE_USER': {
            const { userId } = action.payload;
            console.log(`DELETE_USER ${userId}`);
            break;
        }
        case 'UPDATE_USER': {
            const { userId, name, age } = action.payload;
            console.log(`UPDATE_USER ${userId}:`);
            if (name)
                console.log(`NAME ${name}`);
            if (age)
                console.log(`AGE ${age}`);
            break;
        }
        case 'BLOCK_USER': {
            const { userId, reason } = action.payload;
            console.log(`BLOCK_USER ${userId} Reason ${reason}`);
            break;
        }
        default: {
            throw new Error(`Error`);
        }
    }
}
handleAction({ type: 'CREATE_USER', payload: { name: 'Taras', age: 25 } });
handleAction({ type: 'DELETE_USER', payload: { userId: 111 } });
handleAction({ type: 'UPDATE_USER', payload: { userId: 22, name: 'Tarik' } });
handleAction({ type: 'BLOCK_USER', payload: { userId: 3333, reason: 'Ataka' } });
