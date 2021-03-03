import { createServer, Response } from "miragejs"
import { MockUsers } from './data/users'
import { MockGroups } from './data/groups'

interface Props {
  environment: string
}

export function makeServer(props: Props) {
  return createServer({
    environment: props.environment,
    routes() {
      this.namespace = "api"

      // -------------------------------------------------
      // |                POST requests                  |
      // -------------------------------------------------
      this.post("/*", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        console.log(attrs)
        return new Response(200, {}, {});
      })

      // -------------------------------------------------
      // |                    Users                      |
      // -------------------------------------------------
      this.get("/users", () => MockUsers)
      this.get("/users/:id", (schema, request) => {
        let id = parseInt(request.params.id)
        if( id < MockUsers.length ) {
          return MockUsers[id]
        } else {
          return new Response(404, {}, {
            message: "User with id: " + request.params.id + " not found."
          })
        }
      })

      // -------------------------------------------------
      // |                   Groups                      |
      // -------------------------------------------------
      this.get("/groups", () => MockGroups)
      this.get("/groups/:id", (schema, request) => {
        let id = parseInt(request.params.id)
        if( id < MockGroups.length ) {
          return MockGroups[id]
        } else {
          return new Response(404, {}, {
            message: "Group with id: " + request.params.id + " not found."
          })
        }
      })
    }
  })
}