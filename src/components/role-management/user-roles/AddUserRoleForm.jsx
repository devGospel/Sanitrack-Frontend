"use client";
import BackButton from '@/components/BackButton';
import React, { useEffect, useState } from 'react';
import RoleHeader from '../RoleHeader';
import usePermission from '@/hooks/usePermission';
import useRole from '@/hooks/useRole';
import Spinner from '@/components/loaders/Loader';
import { ToastContainer } from 'react-toastify';

const AddUserRoleForm = () => {
  const { getAllPermission, allPermission, loading } = usePermission();
  const { addRole, buttonLoader } = useRole();

  const [formData, setFormData] = useState({ name: '', permissionId: '' });
  const [errors, setErrors] = useState({ name: '', permissionId: '' });

  useEffect(() => {
    getAllPermission();
  }, []);

  const updateFormData = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const validateForm = () => {
    let valid = true;
    let errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Role name is required';
      valid = false;
    }

    if (!formData.permissionId) {
      errors.permissionId = 'Permission must be selected';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleAddUserRole = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const roleData = {
      role_name: formData.name,
      permission_id: formData.permissionId,
    };

    await addRole(roleData);
  };

  return (
    <>  
     <ToastContainer />
      <RoleHeader />
      <div className='flex w-full lg:w-3/5 justify-between mt-6 lg:px-10 px-5'>
        <BackButton />
        <h2 className="text-xl font-bold">Add User Roles</h2>
      </div>

      <div className="text-black flex flex-col items-center gap-4 bg-white lg:p-10 p-5 w-full">
        <form className="w-full flex flex-col" onSubmit={handleAddUserRole}>
          <div className="flex flex-col gap-x-2 w-full h-auto lg:pt-5 pt-5 space-y-4">
            <div className="text-black w-full flex flex-col items-start">
              <div className="flex flex-col w-full lg:flex-col gap-8 items-center">
                <div className="text-black w-full flex flex-col items-start">
                  <div className="relative w-full">
                    <input
                      id="name"
                      type="text"
                      placeholder="Input User Role"
                      className={`border w-full h-10 md:h-12 px-5 md:text-lg rounded-md outline-none focus:border-slate-400 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                      name="name"
                      onChange={(e) => updateFormData(e, "name")}
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                  </div>
                </div>
                <div className="text-black w-full flex flex-col items-start">
                  <select
                    name="permissionId"
                    className={`text-gray-700 rounded-md w-full border-[1px] h-10 md:h-12 px-5 p-2 bg-transparent ${errors.permissionId ? 'border-red-500' : 'border-gray-400'}`}
                    onChange={(e) => updateFormData(e, "permissionId")}
                  >
                    <option hidden className='px-5'>Select from list of Permissions</option>
                    {allPermission?.map((permission) => (
                      <option
                        key={permission?._id}
                        value={permission?._id}
                        className="capitalize"
                      >
                        {permission.permission_name}
                      </option>
                    ))}
                  </select>
                  {errors.permissionId && <span className="text-red-500 text-sm">{errors.permissionId}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2 px-4 py-3 self-center items-center mt-8 sm:px-6">
            <button
              type="submit"
              disabled={buttonLoader}
              className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-4 bg-blue-600 text-white leading-6 font-medium shadow-sm hover:text-slate-300 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              {buttonLoader ? <Spinner /> : 'Add User Roles'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUserRoleForm;
