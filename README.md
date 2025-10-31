# n8n-nodes-twingate

This is an n8n community node. It lets you use Twingate in your n8n workflows.

Twingate is a zero trust network access platform that provides secure access to private resources. This node integrates with the Twingate GraphQL Admin API to manage users, resources, connectors, remote networks, groups, and access requests.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### User Operations
- **Get** - Retrieve a single user by ID
- **Get Many** - Retrieve multiple users with pagination support
- **Create** - Create a new user
- **Update** - Update an existing user's details
- **Delete** - Delete a user

### Resource Operations
- **Get** - Retrieve a single resource by ID
- **Get Many** - Retrieve multiple resources with pagination support
- **Create** - Create a new resource
- **Update** - Update an existing resource
- **Delete** - Delete a resource

### Connector Operations
- **Get** - Retrieve a single connector by ID
- **Get Many** - Retrieve multiple connectors with pagination support
- **Create** - Create a new connector
- **Update** - Update an existing connector
- **Delete** - Delete a connector

### Remote Network Operations
- **Get** - Retrieve a single remote network by ID
- **Get Many** - Retrieve multiple remote networks with pagination support
- **Create** - Create a new remote network
- **Update** - Update an existing remote network
- **Delete** - Delete a remote network

### Group Operations
- **Get** - Retrieve a single group by ID
- **Get Many** - Retrieve multiple groups with pagination support
- **Create** - Create a new group
- **Update** - Update an existing group
- **Delete** - Delete a group

### Access Request Operations
- **Get** - Retrieve a single access request by ID
- **Get Many** - Retrieve multiple access requests with pagination support
- **Approve** - Approve an access request
- **Reject** - Reject an access request

## Credentials

To use this node, you need to authenticate with Twingate using an API token.

### Prerequisites
1. A Twingate account with admin access
2. A Twingate network already set up

### Setup
1. Log in to your Twingate Admin Console
2. Navigate to **Settings** > **API**
3. Click **Generate Token**
4. Provide a descriptive label for the token
5. Select the permission level (typically **Read, Write & Provision**)
6. Click **Generate** and copy the token (it won't be displayed again)

### Credential Fields
- **Network Name** - Your Twingate network subdomain (without `.twingate.com`)
  - Example: If your network URL is `https://mycompany.twingate.com`, enter `mycompany`
- **API Token** - The API token generated from the Admin Console

## Compatibility

- **Minimum n8n version**: 1.0.0
- **Tested with n8n version**: Latest

## Usage

### Example: Create a User

1. Add a Twingate node to your workflow
2. Select **User** as the resource
3. Select **Create** as the operation
4. Configure:
   - **Email**: user@example.com
   - **First Name**: John
   - **Last Name**: Doe
   - **Role** (in Additional Fields): Member
5. Connect your Twingate credentials

### Example: Approve Access Request

1. Add a Twingate node to your workflow
2. Select **Access Request** as the resource
3. Select **Approve** as the operation
4. Enter the **Access Request ID**
5. Connect your Twingate credentials

### Example: Get All Resources

1. Add a Twingate node to your workflow
2. Select **Resource** as the resource
3. Select **Get Many** as the operation
4. Configure pagination:
   - **Return All**: true (to get all resources) or false (to limit results)
   - **Limit**: 50 (if Return All is false)
5. Connect your Twingate credentials

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Twingate API Documentation](https://www.twingate.com/docs/api)
* [Twingate Getting Started Guide](https://www.twingate.com/docs/getting-started)

## Version history

### 0.1.0 (Initial Release)
- Initial implementation of Twingate node
- Support for User, Resource, Connector, Remote Network, Group, and Access Request resources
- Basic CRUD operations for most resources
- Access Request approval and rejection
- GraphQL API integration with authentication
