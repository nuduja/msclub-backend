import { DocumentDefinition, FilterQuery } from "mongoose";
import { IApplication } from "../interfaces";
import ApplicationModel from "../models/Application.model";

/**
 * Application Service
 * @param {IApplication} application
 * @returns {Promise<IApplication>}
 */
export const addApplication = async (
  applicationData: DocumentDefinition<IApplication>
) => {
  return await ApplicationModel.create(applicationData)
    .then((application) => {
      return application;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

/**
  Application Service
 * @param applicationId @type string
 * @returns {Promise<IApplication>}
 */
export const fetchApplicationById = async (applicationId: string) => {
  return await ApplicationModel.findById(applicationId)
    .then((application) => {
      return application;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

/**
 * Application Service
 * @param {FilterQuery<IApplication>} query
 * @returns {Promise<IApplication>}
 */
export const fetchApplications = async () => {
  return await ApplicationModel.aggregate([
    { $match: { deletedAt: { $eq: null } } },
  ])
    .then((applications) => {
      return applications;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

/**
 delete an Application
 * @param applicationId @type string
 */
export const archiveApplication = async (applicationId: string) => {
  return await ApplicationModel.findById(applicationId)
    .then(async (application) => {
      if (application) {
        application.deletedAt = new Date();
        return await application.save();
      } else {
        return null;
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
