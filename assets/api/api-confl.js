import apiClient from './client';

const API = 'http://192.168.0.220:3000';

//GetAll
const getAllWallets = async (user_id) => {
  try {
    const response = await apiClient.get(`/getWallets/${(user_id)}`);

    if (response.data.success) {
      return response.data.wallets;
    }
  } catch (error) {
    console.log('Error while getting all wallets.', error.message);
    return [];
  }
};

const getAllUsers = async (user_id) => {
  try {
    const response = await apiClient.get(`/getUsers/${(user_id)}`);

    if (response.data.success) {
      return response.data.users;
    }
  } catch (error) {
    console.log('Error while getting all users.', error.message);
    return [];
  }
};

const getAllCategories = async (user_id) => {
  try {
    const response = await apiClient.get(`/getCategories/${(user_id)}`);

    if (response.data.success) {
      return response.data.categories;
    }
  } catch (error) {
    console.log('Error while getting all categories.', error.message);
    return [];
  }
};

const getAllCollections = async (user_id) => {
  try {
    const response = await apiClient.get(`/getCollections/${(user_id)}`);

    if (response.data.success) {
      return response.data.collections;
    }
  } catch (error) {
    console.log('Error while getting all collections.', error.message);
    return [];
  }
};

const getAllLedgers = async (user_id) => {
  try {
    const response = await apiClient.get(`/getLedgers/${(user_id)}`);

    if (response.data.success) {
      return response.data.ledgers;
    }
  } catch (error) {
    console.log('Error while getting all ledgers.', error.message);
    return [];
  }
};

const getAllMembers = async (user_id) => {
  try {
    const response = await apiClient.get(`/getMembers/${(user_id)}`);

    if (response.data.success) {
      return response.data.members;
    }
  } catch (error) {
    console.log('Error while getting all members.', error.message);
    return [];
  }
};

const getAllSubCategories = async (user_id) => {
  try {
    const response = await apiClient.get(`/getSubCategories/${(user_id)}`);

    if (response.data.success) {
      return response.data.subcategories;
    }
  } catch (error) {
    console.log('Error while getting all sub categories.', error.message);
    return [];
  }
};

const getAllTransRecords = async (user_id) => {
  try {
    const response = await apiClient.get(`/getTransRecords/${(user_id)}`);

    if (response.data.success) {
      return response.data.transrecords;
    }
  } catch (error) {
    console.log('Error while getting all transaction records.', error.message);
    return [];
  }
};

const getAllJoinedLists = async (user_id) => {
  try {
    const response = await apiClient.get(`/getTransJoinedLists/${(user_id)}`);

    if (response.data.success) {
      return response.data.joinedlists;
    }
  } catch (error) {
    console.log('Error while getting all joined lists.', error.message);
    return [];
  }
};

const getAllDebtRecords = async (user_id) => {
  try {
    const response = await apiClient.get(`/getDebtRecords/${(user_id)}`);

    if (response.data.success) {
      return response.data.debtrecords;
    }
  } catch (error) {
    console.log('Error while getting all debt records.', error.message);
    return [];
  }
};

//get all with amount

const getAllWAWallets = async (user_id) => {
  try {
    const response = await apiClient.get(`/getWAWallets/${(user_id)}`);

    if (response.data.success) {
      return response.data.wallets;
    }
  } catch (error) {
    console.log('Error while getting all wallets with amount.', error.message);
    return [];
  }
};

const getAllWAUsers = async (user_id) => {
  try {
    const response = await apiClient.get(`/getWAUsers/${(user_id)}`);

    if (response.data.success) {
      return response.data.users;
    }
  } catch (error) {
    console.log('Error while getting all users with amount.', error.message);
    return [];
  }
};

const getAllWACategories = async (user_id) => {
  try {
    const response = await apiClient.get(`/getWACategories/${(user_id)}`);

    if (response.data.success) {
      return response.data.categories;
    }
  } catch (error) {
    console.log('Error while getting all categories with amount.', error.message);
    return [];
  }
};

const getAllWACollections = async (user_id) => {
  try {
    const response = await apiClient.get(`/getWACollections/${(user_id)}`);

    if (response.data.success) {
      return response.data.collections;
    }
  } catch (error) {
    console.log('Error while getting all collections with amount.', error.message);
    return [];
  }
};

const getAllWALedgers = async (user_id) => {
  try {
    const response = await apiClient.get(`/getWALedgers/${(user_id)}`);

    if (response.data.success) {
      return response.data.ledgers;
    }
  } catch (error) {
    console.log('Error while getting all ledgers with amount.', error.message);
    return [];
  }
};

const getAllWAMembers = async (user_id) => {
  try {
    const response = await apiClient.get(`/getWAMembers/${(user_id)}`);

    if (response.data.success) {
      return response.data.members;
    }
  } catch (error) {
    console.log('Error while getting all members with amount.', error.message);
    return [];
  }
};

const getAllWASubCategories = async (user_id) => {
  try {
    const response = await apiClient.get(`/getWASubCategories/${(user_id)}`);

    if (response.data.success) {
      return response.data.subcategories;
    }
  } catch (error) {
    console.log('Error while getting all sub categories with amount.', error.message);
    return [];
  }
};

const getAllWATransRecords = async (user_id) => {
  try {
    const response = await apiClient.get(`/getWATransRecords/${(user_id)}`);

    if (response.data.success) {
      return response.data.transrecords;
    }
  } catch (error) {
    console.log('Error while getting all transaction records with amount.', error.message);
    return [];
  }
};

const getAllWAJoinedLists = async (user_id) => {
  try {
    const response = await apiClient.get(`/getWATransJoinedLists/${(user_id)}`);

    if (response.data.success) {
      return response.data.joinedlists;
    }
  } catch (error) {
    console.log('Error while getting all joined lists with amount.', error.message);
    return [];
  }
};

const getAllWADebtRecords = async (user_id) => {
  try {
    const response = await apiClient.get(`/getWADebtRecords/${(user_id)}`);

    if (response.data.success) {
      return response.data.debtrecords;
    }
  } catch (error) {
    console.log('Error while getting all debt records with amount.', error.message);
    return [];
  }
};

const getOneTransRecord = async(wallet_id) => {
  try {
    const response = await apiClient.get(`/getOneTransRecord/${(wallet_id)}`);
    if (response.data.success) {
      return response.data.transrecord;
    }
  } 
  catch (error) {
    console.log('Error while getting all wallets.', error.message);
    return [];
  }
}

const getTotalAmount = async (user_id) => {
  try{
    const response = await apiClient.get(`/getTotalAmount/${(user_id)}`);
    if (response.data.success) {
      return response.data.amounts;
    }
  } catch (error) {
    console.log('Error while getting all wallets.', error.message);
    return 0.00;
  }
}



export default {
  API,
  getAllWallets,
  getAllUsers,
  getAllCategories,
  getAllCollections,
  getAllDebtRecords,
  getTotalAmount,
  getAllJoinedLists, 
  getAllLedgers,
  getAllMembers, 
  getAllSubCategories,
  getAllTransRecords,
  getOneTransRecord,
  getAllWAWallets,
  getAllWAUsers,
  getAllWACategories,
  getAllWACollections,
  getAllWADebtRecords,
  getAllWAJoinedLists, 
  getAllWALedgers,
  getAllWAMembers, 
  getAllWASubCategories,
  getAllWATransRecords,
}