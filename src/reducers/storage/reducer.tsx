import { STORAGE } from './constants';

const storage = (state: any = {}, action: any) => {

    if (action?.entity?.model) {

        switch (action.type) {
            case STORAGE.GET.SUCCESS:
            case STORAGE.SAVE.SUCCESS:
                // console.log(`Storage: Added '${Object.keys(action.entity.model)}' into the state`);
                // console.log(action.entity.model);

                return {
                    ...state,
                    ...action.entity.model
                };
            case STORAGE.REMOVE.SUCCESS:
                for (let key in action.entity.model) {
                    if (state[key]) {
                        delete state[key];
                        // console.log(`Storage: Removed '${key}' from the state`);
                    }
                }

                return state;
        }
    }

    return state;
}

export default storage;